
import pandas as pd
import psycopg2 
import psycopg2.extras as extras

from sqlalchemy import create_engine
engine = create_engine('postgresql://postgres:safepassword2023@localhost:5432/helsinki-city-bike-app')

connection_params_dic = {
     'host':'localhost',
     'database':'helsinki-city-bike-app',
     'user':'postgres',
     'password':'safepassword2023'
}

conn = psycopg2.connect("dbname=helsinki-city-bike-app host=localhost user=postgres password=safepassword2023")

def extract_journeys_data_from_csv(filepath):
   
    data = pd.read_csv(filepath,index_col=False)
    df = pd.DataFrame(data)

    dfLongerThanTenSecsAndTenMeters = df.loc[(df['Duration (sec.)'] > 10) & (df['Covered distance (m)'] > 10)]
    dfFormattedColNames = dfLongerThanTenSecsAndTenMeters.rename(columns={'Departure':'departure',
                                                                          'Return':'return',
                                                                          'Departure station name':'departureStationName',
                                                                          'Departure station id':'departureStationId',
                                                                          'Return station name':'returnStationName',
                                                                          'Return station id':'returnStationId',
                                                                          'Covered distance (m)' : 'coveredDistance',
                                                                          'Duration (sec.)' : 'duration'})
    dfFinal = dfFormattedColNames.reset_index(drop=True).loc[:,~dfFormattedColNames.columns.isin(['departureStationName', 'returnStationName']) ]
    return dfFinal


def extract_stations_data_from_csv(filepath):
     data = pd.read_csv(filepath,index_col=False)
     df = pd.DataFrame(data)
     renamedCols = df.rename(columns={
          'FID':'fId',
          'ID':'id',
          'Nimi':'name_FIN',
          'Namn':'name_SWE',
          'Name':'name_ENG',
          'Osoite':'address',
          'Kaupunki':'city_FIN',
          'Stad':'city_SWE',
          'Operaattor':'operator',
          'Kapasiteet':'capacity',
     })

     return renamedCols.loc[:,renamedCols.columns != 'Adress']


firstJourneyFile = "./2021-05.csv"
secondJourneyFile = "./2021-06.csv"
thirdJourneyFile = "./2021-07.csv"

stationsFile = "./Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv"

firstJourneyDataframe = extract_journeys_data_from_csv(firstJourneyFile)
secondJourneyDataframe = extract_journeys_data_from_csv(secondJourneyFile)
thirdJourneyDataframe = extract_journeys_data_from_csv(thirdJourneyFile)

stationsDataframe = extract_stations_data_from_csv(stationsFile)
stationsIds = stationsDataframe['id'].tolist()

def deleteJourneysWithIdsOfStationsThatDontExist(stationIds,dataframe):
     cleanedDf = dataframe[dataframe['departureStationId'].isin(stationIds) & dataframe['returnStationId'].isin(stationIds)]
     return cleanedDf

cleanedFirstJourneyDataframe = deleteJourneysWithIdsOfStationsThatDontExist(stationsIds,firstJourneyDataframe)

cleanedFirstJourneyDataframe.to_sql('Journey',engine,if_exists='append', index=False)
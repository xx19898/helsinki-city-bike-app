import { capitalLeadingLetterAndSeparateWords} from "../../modules/journeys/hooks/useJourneyMainComponent"


describe('testing parsing list of key strings in capitalLeadingLetterAndSeparateWords function',() => {
    it('function parses string in a right way', () => {
        const input = ['testString']
        const parsingResult = capitalLeadingLetterAndSeparateWords(input)
        console.log({parsingResult})
        expect(parsingResult[0]).toBe('Test String')
    })
  
    it('function parses list of keys in a right way',() => {
        const input = ['id','departureStation','returnStation','departStatId']
        const awaitedResponse = ['Id','Departure Station','Return Station','Depart Stat Id']
        expect(capitalLeadingLetterAndSeparateWords(input)).toStrictEqual(awaitedResponse)
    })
})
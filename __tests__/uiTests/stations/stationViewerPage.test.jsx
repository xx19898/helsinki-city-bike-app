import { render, screen } from '@testing-library/react';
import Home from '../../../src/pages/stations/index'

describe('Station Viewer',() => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: 'Stations',
          });
       
          expect(heading).toBeInTheDocument();
        })
})
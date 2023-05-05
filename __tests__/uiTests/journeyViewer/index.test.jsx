import { render, screen } from '@testing-library/react';
import Home from '../../../src/pages/journeys/index'

describe('Journey Viewer',() => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: 'welcome to next',
          });
       
          expect(heading).toBeInTheDocument();
        })
})
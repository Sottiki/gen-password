import { Container } from '@chakra-ui/react';
import { NumberForm } from './components/form/NumberForm';
import { SymbolForm } from './components/form/SymbolForm';
import { WordForm } from './components/form/WordForm';

function App() {
    return (
        <Container>
            <NumberForm />
            <WordForm />
            <SymbolForm />
        </Container>
    );
}

export default App;

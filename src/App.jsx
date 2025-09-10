import { Container } from '@chakra-ui/react';
import { NumberForm } from './components/form/NumberForm';
import { WordForm } from './components/form/WordForm';

function App() {
    return (
        <Container>
            <NumberForm />
            <WordForm />
        </Container>
    );
}

export default App;

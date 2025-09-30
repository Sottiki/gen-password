import { Box, Container, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { NumberForm } from './components/form/NumberForm';
import { SymbolForm } from './components/form/SymbolForm';
import { WordForm } from './components/form/WordForm';
import GenerateButton from './components/GenerateButton';
import ResultText from './components/ResultText';

function App() {
    const [password, setPassword] = useState('');

    return (
        <Container maxW="md" py={10}>
            <Box boxShadow="md" borderRadius="lg" p={8}>
                <Stack spacing={6}>
                    <NumberForm />
                    <WordForm />
                    <SymbolForm />
                </Stack>
                <GenerateButton onGenerate={setPassword} />
                <ResultText password={password} />
            </Box>
        </Container>
    );
}

export default App;

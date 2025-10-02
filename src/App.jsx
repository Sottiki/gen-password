import { Box, Container, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { NumberForm } from './components/form/NumberForm';
import { SymbolForm } from './components/form/SymbolForm';
import { WordForm } from './components/form/WordForm';
import GenerateButton from './components/GenerateButton';
import ResultText from './components/ResultText';
import { FormProvider } from './context/FormContext';

function App() {
    const [password, setPassword] = useState('');

    return (
        <FormProvider>
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
        </FormProvider>
    );
}

export default App;

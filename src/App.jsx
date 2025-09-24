import { Box, Container, Stack } from '@chakra-ui/react';
import { NumberForm } from './components/form/NumberForm';
import { SymbolForm } from './components/form/SymbolForm';
import { WordForm } from './components/form/WordForm';

function App() {
    return (
        <Container maxW="md" py={10}>
            <Box boxShadow="md" borderRadius="lg" p={8}>
                <Stack spacing={6}>
                    <NumberForm />
                    <WordForm />
                    <SymbolForm />
                </Stack>
            </Box>
        </Container>
    );
}

export default App;

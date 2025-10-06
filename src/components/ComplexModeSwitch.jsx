import { Box, Switch, Text } from '@chakra-ui/react';
import { useFormContext } from '../context/FormContext';

export function ComplexModeSwitch() {
    const { useComplexMode, setUseComplexMode } = useFormContext();

    return (
        <Box display="flex" alignItems="center" gap={3} mb={4} minH="40px">
            <Switch.Root
                checked={useComplexMode}
                onCheckedChange={(details) => setUseComplexMode(details.checked)}
                colorPalette="teal"
            >
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>
                    <Text fontSize="sm">複雑なパスワード生成モード</Text>
                    <Text as="span" color="gray.500" ml={2}>
                        (文字レベルでシャッフル)
                    </Text>
                </Switch.Label>
                <Box height="20px" borderLeft="1px solid" borderColor="gray.300" mx={2} />
                <Text
                    ml="auto"
                    fontSize="sm"
                    {...(useComplexMode
                        ? { color: 'teal.500', fontWeight: 'bold' }
                        : { color: 'gray.200' })}
                >
                    ON
                </Text>
            </Switch.Root>
        </Box>
    );
}

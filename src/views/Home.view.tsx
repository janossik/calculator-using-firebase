import { useEffect, useState } from 'react';
import { firestoreUtils } from '../firebase/firestore.ts';
import { Box, Button, Container, Typography } from '@mui/material';

function HomeView() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const unsubscribe = firestoreUtils.onSnapshotDocumentData<{ value: number }>(
      (data) => {
        setCount(data?.value ?? 0);
      },
      'counts',
      '1',
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const addCount = async () => {
    try {
      await firestoreUtils.setDocument({ value: count + 1 }, 'counts', '1');
    } catch (error) {
      console.error('An error occurred while updating count:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Vite + React</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Button variant="contained" onClick={addCount} sx={{ margin: '0 auto' }}>
          count is {count}
        </Button>
        <Typography>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </Container>
  );
}

export default HomeView;

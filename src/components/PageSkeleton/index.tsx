import { Skeleton, Stack } from '@mui/material';

function PageSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height="80vh" />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Skeleton variant="rectangular" height="10vh" width="20vw" />
        <Skeleton variant="rectangular" height="10vh" width="20vw" />
        <Skeleton variant="rectangular" height="10vh" width="20vw" />
      </Stack>
    </Stack>
  );
}

export default PageSkeleton;

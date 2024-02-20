import { useNavigate } from 'react-router-dom';

export function useMoveBack() {
  const navigate = useNavigate();

  const moveBack = () => navigate(-1);

  const redirectTo = (redirectToPath) => navigate(redirectToPath, { replace: true });

  return { moveBack, redirectTo }
}

import { useNavigate } from "react-router";

export function useNavigatetoRoutes() {
  const navigate = useNavigate();

  const naviagateRoutes = (url: string) => {
    navigate(url);
  };

  return naviagateRoutes;
}

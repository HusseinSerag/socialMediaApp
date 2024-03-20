import { useNavigate } from "react-router-dom";
export default function useNavigateTo() {
  const navigate = useNavigate();
  function go(path = -1) {
    navigate(path);
  }
  return go;
}

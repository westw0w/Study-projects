import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../Button";
import "./LogoutButton.css";
import { logout } from "../../api/User";

export const LogoutButton = () => {
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })
    }
  }, queryClient);

  const handleLogout = () => {
    logoutMutation.mutate();
  };


  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleLogout} isLoading={logoutMutation.isPending}>Выйти</Button>
    </div>
  );
};

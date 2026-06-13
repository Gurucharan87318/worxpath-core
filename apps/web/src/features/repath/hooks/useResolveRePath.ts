import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resolveRePath } from "../api";

export function useResolveRePath() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resolutionNote?: string) => resolveRePath(resolutionNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repath-status"] });
    },
  });
}
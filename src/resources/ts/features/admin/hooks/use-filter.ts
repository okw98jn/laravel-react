import {
  type RegisteredRouter,
  type RouteIds,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router';

export function useFilter<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T,
) {
  const routeApi = getRouteApi<T>(routeId);
  const filters = routeApi.useSearch();
  const navigate = useNavigate();

  const setFilters = (newFilters: Partial<typeof filters>) =>
    navigate({ search: { ...filters, ...newFilters } as any });

  const resetFilters = () => navigate({ search: {} as any });

  return { filters, setFilters, resetFilters };
}

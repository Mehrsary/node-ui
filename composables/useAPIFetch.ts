import type {
  AllAnalyses,
  AllProjects,
  BodyCreateAnalysisPoPost,
  BodyCreateRouteBetweenDatastoreAndProjectKongRoutePost,
  ListProjectNodes,
  ListServices,
  Service,
} from "~/services/Api";

export const useAPIFetch: typeof useFetch = (request, options?) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseURL as string;

  const { user } = useOidcAuth();

  return useFetch(request, {
    baseURL: baseUrl,
    onRequest({ options }) {
      // Annoying workaround to avoid typescript from complaining - cast to Headers then set explicitly
      const headers = options.headers
        ? new Headers(options.headers)
        : new Headers();
      headers.set("Authorization", `Bearer ${user?.value.accessToken}`);
      options.headers = headers;
    },
    onRequestError({ request, options, error }) {
      console.log(request);
      console.log(options);
      console.log(error);
    },
    onResponse({ response }) {
      // Process the response data
      localStorage.setItem("token", response._data.token);
    },
    onResponseError({ response }) {
      // Handle the response errors
      console.log(response);
    },
    ...options,
  });
};

// Hub endpoints
export const approveRejectProjectProposal = (
  approved: boolean,
  project_id: string,
) => {
  const formData = new FormData();
  formData.append("approval_status", approved ? "approved" : "rejected");

  return useAPIFetch(`/project-nodes/${project_id}`, {
    method: "POST",
    body: formData,
  });
};

export const getProposals = () => {
  return useAPIFetch<{ data: ListProjectNodes }>("/project-nodes", {
    method: "GET",
    query: { include: "project,node" },
  });
};

export const getProjects = () => {
  return useAPIFetch<{ data: AllProjects }>("/projects", {
    method: "GET",
  });
};

export const getAnalyses = () => {
  return useAPIFetch<{ data: AllAnalyses }>("/analyses", {
    method: "GET",
  });
};

// Kong endpoints
export const getDataStores = () => {
  return useAPIFetch<{ data: ListServices }>("/kong/datastore", {
    method: "GET",
  });
};

export const createDataStore = (dataStoreProps: Service) => {
  return useAPIFetch(`/kong/datastore`, {
    method: "POST",
    body: dataStoreProps,
  });
};

export const deleteDataStore = (dataStoreName: string) => {
  return useAPIFetch(`/kong/datastore/${dataStoreName}`, {
    method: "DELETE",
  });
};

export const createRoute = (
  routeProps: BodyCreateRouteBetweenDatastoreAndProjectKongRoutePost,
) => {
  return useAPIFetch(`/kong/route`, {
    method: "POST",
    body: routeProps,
  });
};

// PodOrc endpoints
export const startAnalysis = (analysisProps: BodyCreateAnalysisPoPost) => {
  return useAPIFetch(`/po`, {
    method: "POST",
    body: analysisProps,
  });
};

export const stopAnalysis = (analysisId: string) => {
  return useAPIFetch(`/po/${analysisId}/stop`, {
    method: "PUT",
  });
};

export const deleteAnalysis = (analysisId: string) => {
  return useAPIFetch(`/po/${analysisId}/delete`, {
    method: "DELETE",
  });
};

// Results endpoints
export const downloadLocalObject = (objectId: string) => {
  return useAPIFetch(`/local/${objectId}`, {
    method: "GET",
    headers: { "Content-Disposition": "application/octet-stream" },
  });
};

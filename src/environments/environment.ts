
export const environment = {
  production: false,
  apiUrl: (window as any)["env"]["FACEIT_API_KEY"] || "",
};

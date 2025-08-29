export const API_ENDPOINTS = {
  baseurl: "https://kisalayakgschool.com/api/",
  category: {
    get: 'category/getAll',
    create: 'category/create',
    update: (id: string) => `category/update/${id}`,
    delete: (id: string) => `category/delete/${id}`,
  },
  patients: {
    list: 'getStudent',
    create: 'patients',
    update: (id: string) => `patients/${id}`,
    delete: (id: string) => `patients/${id}`,
    bulkDelete: 'patients/bulk-delete',
    export: 'patients/export',
    filterOptions: 'getStudent/filter-options'
  },
};

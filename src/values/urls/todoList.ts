const basePatientUrl = '/patient'

export const getPatientInfo = (patientId: string): string => `${basePatientUrl}/load-details/${patientId}`

export const getPatientList = (): string => `${basePatientUrl}/load-all`

export const getPatientInactive = (): string => `${basePatientUrl}/load/inactive`

export const postPatientSignUp = (): string => `${basePatientUrl}/sign-up`

export const getIMC = (patientId: string): string => `${basePatientUrl}/imc-average/${patientId}`

export const getDysthymiaPatients = (): string => `${basePatientUrl}/load-dysthymia`

export const getGlobalFilter = (): string => `${basePatientUrl}/global-filter`

export const postUpdatePatient = (patientId: string): string => `${basePatientUrl}/save/${patientId}`

export const putUpdatePatientPhoto = (): string => `${basePatientUrl}/upload`

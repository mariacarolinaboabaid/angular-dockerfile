export interface PedagogicalMonitoring {
    student: string
    teacher: string
    title: string
    date: string
    description: string
    finished: boolean
    id?: number
}

export interface PedagogicalMonitoringDictionary {
    [key: string]: any; 
  }
  

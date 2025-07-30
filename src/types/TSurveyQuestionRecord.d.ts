interface TSurveyQuestionRecord {
  id: string
  MasterSurveyId: number
  DirektoratId: number
  Direktorat: TDirektoratRecord
  question: string
  type: number 
  criteria: string
}
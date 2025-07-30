interface TSurveyAnswerPayload {
  MasterSurveyId: number
  SurveyRespondenId: number 
  answers: Array<{
    SurveyQuestionId: number 
    answer: text
  }>
}

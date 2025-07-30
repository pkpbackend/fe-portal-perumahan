import { useApiV3 } from "@helpers/ApiHelper"
import { useState } from "react"

export default function useSurvey() {
  const apiV3 = useApiV3()

  const [questions, setQuestions] = useState<TSurveyQuestionRecord[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  const fetchAllQuestions = async (search: Partial<TSurveyQuestionRecord>) => {
    const filtered = JSON.stringify(
      Object.keys(search).map((id) => {
        return {
          id,
          value: search[id],
        }
      })
    )

    setLoadingQuestions(true)
    return apiV3
      .get("/portalperumahan/survey/question/all", { params: { filtered } })
      .then((res) => {
        setQuestions(res.data)
      })
      .finally(() => setLoadingQuestions(false))
  }

  const postResponden = async (body: TSurveyRespondenPayload) => {
    return await apiV3.post("/portalperumahan/survey/responden", body)
  }

  const putResponden = async (id: number, body: TSurveyRespondenPayload) => {
    return await apiV3.put(`/portalperumahan/survey/responden/${id}`, body)
  }

  const postAnswer = async (body: TSurveyAnswerPayload) => {
    return await apiV3.post("/portalperumahan/survey/answer", body)
  }

  return {
    questions,
    fetchAllQuestions,
    loadingQuestions,
    postResponden,
    putResponden,
    postAnswer,
  }
}

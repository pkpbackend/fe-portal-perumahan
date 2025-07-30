import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import Head from "next/head";
import { Col, Row, Typography, Radio, Select, Spin, Modal, theme } from "antd";
import * as Yup from "yup";
import UiInput from "@components/Input/UiInput";
import UiButton from "@components/Button/UiButton";
import style from "./SurveyStyle.module.scss";
import { GlobalStore } from "@stores/GlobalStore";
import useSurvey from "@hooks/useSurvey";
import ServerAlert from "@widgets/ServerAlert";
import useWilayah from "@hooks/useWilayah";
import useDirektorat from "@hooks/useDirektorat";
import { useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;

const { useToken } = theme;

const initialValues = {
  name: "",
  gender: undefined,
  instansi: "",
  pekerjaan: "",
  ProvinsiId: undefined,
  pendidikanTerakhir: "",
  phoneNumber: "",
  DirektoratId: undefined,
  answers: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Nama tidak boleh lebih dari 50 karakter")
    .required("Nama belum diisi"),
  gender: Yup.number().required("Jenis kelamin belum diisi"),
  instansi: Yup.string()
    .max(50, "Instansi tidak boleh lebih dari 50 karakter")
    .required("Instansi belum diisi"),
  pekerjaan: Yup.string()
    .max(50, "Pekerjaan tidak boleh lebih dari 50 karakter")
    .required("Pekerjaan belum diisi"),
  ProvinsiId: Yup.number().required("Provinsi belum diisi"),
  pendidikanTerakhir: Yup.string()
    .max(50, "Pendidikan terakhir tidak boleh lebih dari 50 karakter")
    .required("Pendidikan terakhir belum diisi"),
  phoneNumber: Yup.string()
    .max(50, "No. telp tidak boleh lebih dari 50 karakter")
    .required("No. telp belum diisi"),
  DirektoratId: Yup.number().required("Unit evaluasi belum diisi"),
});

export default function SurveyView() {
  const { token } = useToken();

  const { setServerSaid, clearServerSaid } = useContext(GlobalStore);

  const router = useRouter();

  const MasterSurveyId = Number(router.query.id);
  const [SurveyRespondenId, setSurveyRespondenId] = useState(0);
  const [unitEvaluasi, setUnitEvaluasi] = useState("");

  const [displayModal, setDisplayModal] = useState(false);
  const [step, setStep] = useState(1);

  const {
    questions,
    loadingQuestions,
    fetchAllQuestions,
    postResponden,
    putResponden,
    postAnswer,
  } = useSurvey();
  const {
    loadingDirektorats,
    fetchAllDirektorats,
    direktorats,
    optionsDirektorats,
  } = useDirektorat();
  const { loadingProvinsis, fetchAllProvinsis, optionsProvinsis } =
    useWilayah();

  useEffect(() => {
    fetchAllProvinsis();
    fetchAllDirektorats();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      if (step === 1) {
        const formData = {
          ...values,
          MasterSurveyId,
        };
        clearServerSaid();

        try {
          let response: any;

          if (SurveyRespondenId === 0) {
            response = await postResponden(formData);
          } else {
            response = await putResponden(SurveyRespondenId, formData);
          }

          setSurveyRespondenId(response?.data?.id);
          setStep(2);
        } catch (error: AxiosError | any) {
          const status = error?.response?.status;
          const message = error?.response?.data?.message;
          setServerSaid({ status, message });
        } finally {
          setSubmitting(false);
        }
      } else if (step === 2) {
        const formData = {
          ...values,
          MasterSurveyId,
          SurveyRespondenId,
        };
        clearServerSaid();

        try {
          await postAnswer(formData);
          setStep(3);
        } catch (error: AxiosError | any) {
          const status = error?.response?.status;
          const message = error?.response?.data?.message;
          setServerSaid({ status, message });
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    if (formik.values?.DirektoratId) {
      const direktorat = direktorats.find(
        ({ id }) => id === formik.values?.DirektoratId
      );
      setUnitEvaluasi(direktorat?.name);
    }
  }, [formik.values?.DirektoratId, direktorats]);

  const handleAnswer = (id: string, value: string) => {
    if (Array.isArray(formik.values.answers)) {
      formik.setFieldValue(
        "answers",
        formik.values.answers.map(({ SurveyQuestionId, answer }) => {
          let newAnswer = answer;
          if (SurveyQuestionId === id) {
            newAnswer = `${value}`;
          }

          return {
            SurveyQuestionId,
            answer: newAnswer,
          };
        })
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);

    if (step === 2) {
      fetchAllQuestions({ MasterSurveyId, DirektoratId: 1 });
    }
  }, [step]);

  useEffect(() => {
    formik.setFieldValue(
      "answers",
      questions.map(({ id }) => ({
        SurveyQuestionId: id,
        answer: "",
      }))
    );
  }, [questions]);

  return (
    <section className={style.container}>
      <Head>
        <title>Survey</title>
      </Head>

      <section>
        {step === 1 && (
          <>
            <h2 style={{ color: token.colorPrimary }}>
              DATA DIRI RESPONDEN
              <sup>Harap mengisi data diri anda</sup>
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <ServerAlert />

              <Row>
                <Col xs={24} lg={4}>
                  Nama
                </Col>
                <Col xs={24} lg={20}>
                  <UiInput
                    name={"name"}
                    placeholder={"Masukan name"}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={
                      formik.errors.name && formik.touched.name ? "error" : null
                    }
                  />
                  {formik.errors.name && formik.touched.name && (
                    <Text type={"danger"}>{formik.errors.name}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Jenis Kelamin
                </Col>
                <Col xs={24} lg={20}>
                  <Radio.Group
                    onChange={(event) =>
                      formik.setFieldValue("gender", event.target.value)
                    }
                    value={formik.values.gender}
                  >
                    <Radio value={1}>Laki-laki</Radio>
                    <Radio value={0}>Perempuan</Radio>
                  </Radio.Group>
                  {formik.errors.gender && formik.touched.gender && (
                    <Text type={"danger"}>{formik.errors.gender}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Instansi
                </Col>
                <Col xs={24} lg={20}>
                  <UiInput
                    name={"instansi"}
                    placeholder={"Masukan instansi"}
                    value={formik.values.instansi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={
                      formik.errors.instansi && formik.touched.instansi
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.instansi && formik.touched.instansi && (
                    <Text type={"danger"}>{formik.errors.instansi}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Pekerjaan
                </Col>
                <Col xs={24} lg={20}>
                  <UiInput
                    name={"pekerjaan"}
                    placeholder={"Masukan pekerjaan"}
                    value={formik.values.pekerjaan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={
                      formik.errors.pekerjaan && formik.touched.pekerjaan
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.pekerjaan && formik.touched.pekerjaan && (
                    <Text type={"danger"}>{formik.errors.pekerjaan}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Provinsi
                </Col>
                <Col xs={24} lg={20}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Masukan provinsi"
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? "").includes(
                        input.toLowerCase()
                      )
                    }
                    options={optionsProvinsis}
                    onChange={(value) =>
                      formik.setFieldValue("ProvinsiId", value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.ProvinsiId}
                    disabled={formik.isSubmitting || loadingProvinsis}
                    status={
                      formik.errors.ProvinsiId && formik.touched.ProvinsiId
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.ProvinsiId && formik.touched.ProvinsiId && (
                    <Text type={"danger"}>{formik.errors.ProvinsiId}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Pendidikan Terakhir
                </Col>
                <Col xs={24} lg={20}>
                  <UiInput
                    name={"pendidikanTerakhir"}
                    placeholder={"Masukan pendidikan terakhir"}
                    value={formik.values.pendidikanTerakhir}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={
                      formik.errors.pendidikanTerakhir &&
                      formik.touched.pendidikanTerakhir
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.pendidikanTerakhir &&
                    formik.touched.pendidikanTerakhir && (
                      <Text type={"danger"}>
                        {formik.errors.pendidikanTerakhir}
                      </Text>
                    )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  No. Telp
                </Col>
                <Col xs={24} lg={20}>
                  <UiInput
                    name={"phoneNumber"}
                    placeholder={"Masukan no. telp"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={
                      formik.errors.phoneNumber && formik.touched.phoneNumber
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <Text type={"danger"}>{formik.errors.phoneNumber}</Text>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={24} lg={4}>
                  Unit Evaluasi
                </Col>
                <Col xs={24} lg={20}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Masukan direktorat"
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? "").includes(
                        input.toLowerCase()
                      )
                    }
                    options={optionsDirektorats}
                    onChange={(value) =>
                      formik.setFieldValue("DirektoratId", value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.DirektoratId}
                    disabled={formik.isSubmitting || loadingDirektorats}
                    status={
                      formik.errors.DirektoratId && formik.touched.DirektoratId
                        ? "error"
                        : null
                    }
                  />
                  {formik.errors.DirektoratId &&
                    formik.touched.DirektoratId && (
                      <Text type={"danger"}>{formik.errors.DirektoratId}</Text>
                    )}
                </Col>
              </Row>

              <footer>
                <UiButton
                  htmlType={"submit"}
                  type={"primary"}
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                >
                  Mulai
                </UiButton>
              </footer>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ color: token.colorPrimary }}>
              UNIT EVALUASI: {unitEvaluasi}
              <small>
                Harap mengisi setiap pertanyaan dengan nilai 1 (sangat tidak
                setuju) sampai 5 (sangat setuju)
              </small>
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <ServerAlert />

              {loadingQuestions ? (
                <Spin />
              ) : (
                <ol>
                  {questions.map(({ id, question, type }, index) => (
                    <li key={`question-${id}`} className={style.question}>
                      {question}
                      <div>
                        {type === 1 && (
                          <TextArea
                            onChange={(event) =>
                              handleAnswer(id, event.target.value)
                            }
                          />
                        )}
                        {type === 2 && (
                          <Radio.Group
                            onChange={(event) =>
                              handleAnswer(id, event.target.value)
                            }
                            // value={formik.values.answers}
                          >
                            {[1, 2, 3, 4, 5].map((i: number) => (
                              <Radio value={i}>{i}</Radio>
                            ))}
                          </Radio.Group>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              <footer className={style.dual}>
                <UiButton
                  onClick={() => setStep(1)}
                  disabled={formik.isSubmitting}
                >
                  Batal
                </UiButton>
                <UiButton
                  htmlType={"button"}
                  type={"primary"}
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  onClick={() => setDisplayModal(true)}
                >
                  Selesai
                </UiButton>
              </footer>

              <Modal
                title="Konfirmasi"
                open={displayModal}
                onOk={() => {
                  formik.submitForm();
                  setDisplayModal(false);
                }}
                onCancel={() => setDisplayModal(false)}
              >
                <p>Apakah Anda yakin dengan jawaban Anda? </p>
              </Modal>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2
              style={{
                paddingTop: 128,
                paddingBottom: 80,
                textAlign: "center",
                color: token.colorPrimary,
              }}
            >
              TERIMA KASIH
              <sup>Masukan Anda telah kami terima</sup>
            </h2>
          </>
        )}
      </section>
    </section>
  );
}

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { HomePageProps } from "@pages/index";
import { Carousel, Grid, Typography, theme } from "antd";
import style from "./CarouselStyle.module.scss";
const { useToken } = theme;
const { useBreakpoint } = Grid;

const arrowContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  borderRadius: "40px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
  zIndex: 1,
  fontSize: "16px",
  fontWeight: "bold",
};

const SliderItem = ({
  title,
  description,
  src,
}: {
  title?: string;
  description?: string;
  src: string;
}) => {
  return (
    <div className={style.carouselItem}>
      <img src={src} alt={title} crossOrigin="anonymous" />
      {title || description ? (
        <div className={style.carouselItemContent}>
          <div>
            {title ? (
              <>
                <Typography.Title level={1} style={{ margin: 0 }}>
                  {title}
                </Typography.Title>
                <div
                  style={{
                    width: 67,
                    height: 7,
                    borderRadius: 100,
                    background: "#F1AE01",
                    margin: "1rem 0",
                  }}
                />
              </>
            ) : null}
            {description ? (
              <Typography.Paragraph strong>{description}</Typography.Paragraph>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
const PrevArrow = (props) => {
  const { token } = useToken();

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...arrowContainerStyle,
        backgroundColor: "#fff",
        color: token.colorPrimary,
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
};

const NextArrow = (props) => {
  const { token } = useToken();

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...arrowContainerStyle,
        backgroundColor: token.colorPrimary,
        color: "#fff",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};

const settings = {
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

export default function CarouselWidget({
  bannerItems,
}: Pick<HomePageProps, "bannerItems">) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { token } = useToken();

  return (
    <section className={style.container}>
      {isMobile ? (
        <Carousel
          arrows={false}
          style={
            {
              "--dots-background": token.colorInfo,
            } as any
          }
        >
          {bannerItems.map((item) => {
            return (
              <SliderItem
                key={item?.title || item?.filepathMobile}
                title={item.title}
                description={item.description}
                src={item.filepathMobile}
              />
            );
          })}
        </Carousel>
      ) : (
        <Carousel
          {...settings}
          arrows
          style={
            {
              "--dots-background": token.colorInfo,
            } as any
          }
        >
          {bannerItems.map((item, index) => {
            return (
              <SliderItem
                key={item?.title || item?.filepathDesktop}
                title={item.title}
                description={item.description}
                src={item.filepathDesktop}
              />
            );
          })}
        </Carousel>
      )}
    </section>
  );
}

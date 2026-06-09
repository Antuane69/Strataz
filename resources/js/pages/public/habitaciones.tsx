import { Head } from '@inertiajs/react';
import { Button, Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function About() {
    return (
        <>
          <Head title="Habitaciones" />

          <main className="mx-auto max-w-6xl px-6 py-12">
              <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={12}>
                      <Title level={1}>Meson de Mita</Title>
                      <Paragraph>
                          Una pagina publica hecha con React, Inertia y Ant Design.
                      </Paragraph>
                      <Button type="primary" size="large">
                          Conocer el menu
                      </Button>
                  </Col>

                  <Col xs={24} md={12}>
                      <Card title="Horario">
                          <Paragraph>Lunes a domingo</Paragraph>
                          <Paragraph strong>8:00 am a 10:00 pm</Paragraph>
                      </Card>
                  </Col>
              </Row>
              <p>prueba</p>
              <p>prueba</p>
              <p>prueba</p>
              <p>prueba</p>
              <p>prueba</p>
              <p>prueba</p>
          </main>
        </>
    );
}
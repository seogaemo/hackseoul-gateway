import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function SGMSwaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("REST API Documentation")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document", app, document);
}

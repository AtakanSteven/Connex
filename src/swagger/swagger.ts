import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class Swagger {
  private path = 'swagger';
  private title = `Connex Task`;
  private description = 'Connex Task API';
  private config: Omit<OpenAPIObject, 'paths'>;

  constructor(private readonly app: INestApplication) {
    this.createConfig();
  }

  createDocument() {
    const document = SwaggerModule.createDocument(this.app, this.config);
    SwaggerModule.setup(this.path, this.app, document);
  }

  private createConfig() {
    this.config = new DocumentBuilder().setTitle(this.title).setDescription(this.description).addBearerAuth().build();
  }
}

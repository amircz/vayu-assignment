import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {configObject} from "./config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    const {port} = configObject.serverConfig
    await app.listen(port);
}

bootstrap();

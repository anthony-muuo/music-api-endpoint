import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'postgres',
      password: 'pass123',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ArtistModule,
    UserModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';
import { ParseObjectIdPipe } from '../common/utils/parse-object-id-pipe.pipe';
import { DetailUserDto } from './dto/detail-user.dto';
import { PageDto } from '../common/dto/page.dto';
import { ApiPaginatedResponse } from '../common/dto/api-pagination-response';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { AddUserFavoritePokemonInput } from './inputs/add-user-favorite-pokemon.input';
import { IUserFavoritesPokemon } from './interfaces/user-favorites-pokemon.interface';
import { UserFavoritePokemonDto } from './dto/user-favorite-pokemon.dto';
import { AuthenticatedAccount } from '../common/decorators/auth-user.decorator';

@ApiTags('Users')
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all users' })
  @ApiExtraModels(PageDto, UserDto)
  @ApiPaginatedResponse(UserDto)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IUser>> {
    return await this._userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a user according to its ID' })
  @ApiParam({
    name: '_id',
    required: true,
    type: 'string',
    example: '6172cc12a50810efa89d8859',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiOkResponse({
    status: 200,
    description: 'Success response',
    type: [DetailUserDto],
  })
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<IUser> {
    return await this._userService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [UserDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async create(@Body() newUser: CreateUserInput): Promise<IUser> {
    return await this._userService.create(newUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a user according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6172cc12a50810efa89d8859',
  })
  @ApiBody({ type: UpdateUserInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [UserDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUser: UpdateUserInput,
  ): Promise<IUser> {
    return await this._userService.update(id, updateUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a user according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6172cc12a50810efa89d8859',
  })
  @ApiOkResponse({ status: 201, description: 'Success remove user' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const resp = await this._userService.remove(id);

    if (resp.deletedCount == 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { status: 200, message: 'Success remove user' };
  }

  @Post('favorites')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Add one favorite a user according to its ID User in login',
  })
  @ApiBody({ type: AddUserFavoritePokemonInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [UserFavoritePokemonDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async addFavorite(
    @Body() favoritePokemon: AddUserFavoritePokemonInput,
    @AuthenticatedAccount() user,
  ): Promise<IUserFavoritesPokemon> {
    return this._userService.addFavorite(favoritePokemon, user);
  }

  @Get('favorites/:id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({
    summary: 'Get all favorites pokemon the user according to its ID User',
  })
  @ApiExtraModels(PageDto, UserFavoritePokemonDto)
  @ApiPaginatedResponse(UserFavoritePokemonDto)
  async getFavorites(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IUserFavoritesPokemon>> {
    return this._userService.getFavorites(id, pageOptionsDto);
  }

  @Delete('favorite/pokemon/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a favorite pokemon according to its ID user',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6172cc12a50810efa89d8859',
  })
  @ApiOkResponse({
    status: 201,
    description: 'Success remove favorite pokemon user',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async removeFavoritePokemon(@Param('id', ParseObjectIdPipe) id: string) {
    const resp = await this._userService.removeFavoritePokemon(id);

    if (resp.deletedCount == 0) {
      throw new HttpException(
        'Favorite pokemon user not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return { status: 200, message: 'Success remove favorite pokemon user' };
  }
}

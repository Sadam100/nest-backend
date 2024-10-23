import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true })) // Apply validation pipe
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() productData: CreateProductDto): Product {
    return this.productService.create(productData);
  }

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateProductDto): Product {
    return this.productService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.productService.remove(+id);
    // return {msg: 'Deleted Successfully'}
  }
}

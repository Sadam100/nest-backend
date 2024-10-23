import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should create a product', () => {
    const product: Omit<Product, 'id'> = {
      name: 'Test Product',
      description: 'A sample product',
      price: 100,
      stock: 10,
    };
    const result = service.create(product);
    expect(result).toEqual({ ...product, id: 1 });
  });

  it('should return all products', () => {
    service.create({ name: 'Product 1', description: 'Desc 1', price: 50, stock: 5 });
    service.create({ name: 'Product 2', description: 'Desc 2', price: 75, stock: 3 });

    const products = service.findAll();
    expect(products.length).toBe(2);
  });

  it('should find one product by id', () => {
    service.create({ name: 'Product 1', description: 'Desc 1', price: 50, stock: 5 });
    const product = service.findOne(1);
    expect(product).toBeTruthy();
  });

  it('should throw error if product not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a product by id', () => {
    service.create({ name: 'Product 1', description: 'Desc 1', price: 50, stock: 5 });
    const updatedProduct = service.update(1, { name: 'Updated Product' });
    expect(updatedProduct.name).toEqual('Updated Product');
  });

  it('should delete a product by id', () => {
    service.create({ name: 'Product 1', description: 'Desc 1', price: 50, stock: 5 });
    service.remove(1);
    expect(service.findAll().length).toBe(0);
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          // Provide a mock version of ProductService
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should create a product', async () => {
    const productData: Omit<Product, 'id'> = {
      name: 'Test Product',
      description: 'A sample product',
      price: 100,
      stock: 20,
    };
    const result = { ...productData, id: 1 };

    jest.spyOn(productService, 'create').mockImplementation(() => result);
    // jest.spyOn(productService, 'create').mockImplementation(() => ({ ...productData, id: 2 }));

    expect(await productController.create(productData)).toBe(result);
    expect(productService.create).toHaveBeenCalledWith(productData);
    
  });

  it('should return all products', async () => {
    const result: Product[] = [
      { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, stock: 10 },
    ];
    jest.spyOn(productService, 'findAll').mockImplementation(() => result);
    // jest.spyOn(productService, 'findAll').mockImplementation(() => []);

    expect(await productController.findAll()).toBe(result);
    expect(productService.findAll).toHaveBeenCalled();
  });

  it('should return one product by id', async () => {
    const result: Product = { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, stock: 10 };
    jest.spyOn(productService, 'findOne').mockImplementation(() => result);
    // jest.spyOn(productService, 'findOne').mockImplementation(() => ({ ...result, id: 2 }));

    expect(await productController.findOne('1')).toBe(result);
    expect(productService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a product by id', async () => {
    const result: Product = { id: 1, name: 'Updated Product', description: 'Desc 1', price: 100, stock: 10 };
    jest.spyOn(productService, 'update').mockImplementation(() => result);
    // jest.spyOn(productService, 'update').mockImplementation(() => ({ ...result, name: 'Wrong Name' }));

    expect(await productController.update('1', { name: 'Updated Product' })).toBe(result);
    expect(productService.update).toHaveBeenCalledWith(1, { name: 'Updated Product' });
  });

  it('should delete a product by id', async () => {
    const result = {msg: 'Deleted Successfully'}
    jest.spyOn(productService, 'remove').mockImplementation(() => undefined);

    expect(await productController.remove('1')).toBeUndefined();
    // expect(await productController.remove('1')).toBeNull();
    expect(productService.remove).toHaveBeenCalledWith(1);
  });
});

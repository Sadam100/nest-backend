import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private idCounter = 1;

  // Create a new product
  create(product: Omit<Product, 'id'>): Product {
    const newProduct = { ...product, id: this.idCounter++ };
    this.products.push(newProduct);
    return newProduct;
  }

  // Get all products
  findAll(): Product[] {
    return this.products;
  }

  // Get a product by ID
  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Update a product by ID
  update(id: number, updatedProduct: Partial<Product>): Product {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index] = { ...product, ...updatedProduct };
    return this.products[index];
  }

  // Delete a product by ID
  remove(id: number): void {
    const product = this.findOne(id);
    this.products = this.products.filter(p => p.id !== product.id);
  }
}


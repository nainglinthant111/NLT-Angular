import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../core/Model/object-model';
import { ProductService } from '../shared/services/product.service';
declare var jQuery: any;
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  all_product_data: any;
  addEditProductDForm!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  add_product!: boolean;
  edit_product!: boolean;
  product_data: any;
  single_product_data: any;
  product_dto!: Product;
  edit_product_id: any;
  
  constructor(private router: Router, private productservice: ProductService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.addEditProductDForm = this.fb.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    })
    this.getAllProduct();
  }
  get rf() {
    return this.addEditProductDForm.controls;
  }
  getAllProduct() {
    this.productservice.allProduct().subscribe(data => {
      this.all_product_data = data;
      console.log("All Product", this.all_product_data);
    }, error => {
      console.log("getAllProduct error ", error);
    })
  }
  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add new Product";
    this.addEditProductDForm.reset();

  }
  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductDForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductDForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productservice.addNewProduct(this.product_dto).subscribe(data => {
      console.log(data);
      jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct()
    }, error => {
      console.log("addNewProduct error", error);
    })
  }

  editProductPopup(id: any) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductDForm.reset();
    this.productservice.singleProduct(id).subscribe(data => {
      this.single_product_data = data;
      console.log("single data", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductDForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
      })
    })
  }
  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductDForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductDForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productservice.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
      jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct();
    }, error => {
      console.log("updateProduct", error);

    })
  }

  deleteProduct(id: any) {
    let conf = confirm("Do yor want to delete this product is : " + id);
    if (conf) {
      this.productservice.deleteProduct(id).subscribe(data => {
        console.log("Delete Successful !", data);
        this.getAllProduct();
      }, error => {
        console.log("Delete error ", error);

      })
    } else {
      alert("You pressed cancel !");
    }
  }

}

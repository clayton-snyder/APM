import { Component } from '@angular/core';
import { IProduct } from './product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './product.service';

// Declare this a component for Angular to identify
@Component
({
    // Point to an HTML document to find the layout to be replaced with selector
    templateUrl: './product-list.component.html',

    // Specify the stylesheets to be used for this component. Encapsulation!
    styleUrls: ['./product-list.component.css']
})

// Define the class for the component
export class ProductListComponent implements OnInit {
    // Properties
    pageTitle: string = 'Current Inventory';
    pageSubtitle: string;
    imageWidth: number = 100;
    imageMargin: number = 2;
    showImages: boolean = true;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string
    {
        return this._listFilter;
    }
    set listFilter(filterIn: string)
    {
        this._listFilter = filterIn;
        this.filteredProducts = filterIn ? this.performFilter(filterIn) : this.products;
    }

    // Angular will inject the ProductService here
    constructor(private _productService: ProductService) {
    }

    filteredProducts: IProduct[];
    products: IProduct[];

    toggleImage(): void {
        if (this.showImages) {
            this.showImages = false;
        } else {
            this.showImages = true;
        }
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit(): void {
        console.log('In OnInit');
        this._productService.getProducts().
            subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
            },
                    error => this.errorMessage = <any>error);
        this._listFilter = '';
    }

    onNotify(starRatingIn: number): void {
        console.log(starRatingIn);
        this.pageSubtitle = 'Rating: ' + starRatingIn;
    }
}

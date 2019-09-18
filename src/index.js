import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let inputArray = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: '', inStockOnly: false };
        this.handlerInStok = this.handlerInStok.bind(this);
        this.handlerFilter = this.handlerFilter.bind(this);
    }

    handlerInStok(inStockOnly) {
        this.setState({ inStockOnly })
    }

    handlerFilter(filter) {
        this.setState({ filter });
    }

    render() {
        return (
            <div>
                <SarchBar
                    filter={this.state.filter}
                    inStockOnly={this.state.inStockOnly}
                    onInstokChange={this.handlerInStok}
                    onFilterChange={this.handlerFilter}
                />
                <ProductTable
                    products={this.props.products}
                    inStockOnly={this.state.inStockOnly} 
                    filter={this.state.filter}
                    />
            </div>
        );
    }

}

class SarchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleInStock = this.handleInStock.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }
    handleInStock(e) {
        this.props.onInstokChange(e.target.checked);
    }

    handleFilter(e) {
        this.props.onFilterChange(e.target.value);
    }


    render() {
        return (
            <div>
                <div>
                    <input
                        type='text'
                        value={this.props.filter}
                        onChange={this.handleFilter}
                    />
                </div>
                <div>
                    <input
                        type='checkbox'
                        checked={this.props.inStockOnly}
                        id='inStockOnly'
                        onChange={this.handleInStock}
                    />
                    <label htmlFor="inStockOnly">Only show products in stock</label>
                </div>

            </div>
        );
    }
}


class ProductTable extends React.Component {
    render() {
        const rows = [];
        let lastCategory = null;
        let isInStock = this.props.inStockOnly;
        let filter = this.props.filter;

        this.props.products.filter(product => product.stocked === isInStock && (!filter || product.name.includes(filter, 0))).forEach((product) => {
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
            lastCategory = product.category;
        });

        return (

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan='2'>
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name :
            <span color='red'>{product.name}</span>
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}
class MainComponent extends React.Component {
    render() {
        return (
            <div>
                <FilterableProductTable products={inputArray} />
            </div>
        );
    }
}

ReactDOM.render(
    <MainComponent />,
    document.getElementById('root'));
const cloudinary = require('cloudinary');
const productModel = require('../Models/product.model');

const AddProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );


        const productData = {
            name,
            price: Number(price),
            description,
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            date: Date.now(),
        };
        const product = new productModel(productData)
        await product.save()

        res.status(201).json({ success: true, message: 'Product added successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const ListProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        if (products.length < 0) {
            return res.status(404).json({ success: false, message: 'No products found' })
        }
        res.status(200).json({ success: true, products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



const RemoveProduct = async (req, res) => {
    try {
        const id = req.params.id; 
        const product = await productModel.findByIdAndDelete(id); 
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const SingleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, product })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



const UpdateProduct = async (req, res) => {  // no need of this route
    if (!req.bbody) {
        return res.status(400).json({ success: false, message: 'No data provided please fill all the required fields' });
    }
    try {
        const id = req.body
        const product = await productModel.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, message: 'Product updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}




module.exports = { AddProduct, ListProducts, RemoveProduct, SingleProduct, UpdateProduct };
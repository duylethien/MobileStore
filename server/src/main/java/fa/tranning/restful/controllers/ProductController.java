package fa.tranning.restful.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fa.tranning.restful.entities.GroupVariant;
import fa.tranning.restful.entities.Product;
import fa.tranning.restful.entities.ProductGroup;
import fa.tranning.restful.entities.ProductImage;
import fa.tranning.restful.exceptions.ResourceNotFoundException;
import fa.tranning.restful.repositories.ProductGroupRepository;
import fa.tranning.restful.repositories.ProductImageRepository;
import fa.tranning.restful.repositories.ProductRepository;
import fa.tranning.restful.repositories.ProductVariantRepository;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("product")
public class ProductController {
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductImageRepository productImageRepository;
	@Autowired
	private ProductGroupRepository productGroupRepository;
	@Autowired
	private ProductVariantRepository productVariantRepository;
	@GetMapping("/getlist")
	public List<Product> getAllProduct(){
		return productRepository.findAll();
	}
	@GetMapping("/getcategory")
	public List<ProductGroup> getProductCategory(){
		return productGroupRepository.findAll();
	}	

	@PostMapping("/getproductbyname")
	public Product getProductByName(@RequestBody Product products){
//		
		Product product=productRepository.findByname(products.getName());
		ProductGroup productGroup= productGroupRepository.findById(product.getProduct_group_id());
		GroupVariant groupVariant=productVariantRepository.findById(productGroup.getId());
		product.setGroupname(productGroup.getName());
		product.setVariant(groupVariant.getVariantname());
		return product;
	} 
	//get product by product id
	@GetMapping("/getproductbyid/{id}")
	public ResponseEntity<Product> getProductByProductId(@PathVariable(value = "id") int productid) throws ResourceNotFoundException{
		Product product=productRepository.findById(productid).orElseThrow(()->new ResourceNotFoundException("Product not found on id: "+productid));
		return ResponseEntity.ok(product);	
	}
	
	//add new product
	@PostMapping("/addproduct")
	public ProductImage addproduct(@RequestBody Product product,ProductImage productImage)
	{
//		System.out.println(productImage);
		productRepository.save(product);
		Product getproduct=productRepository.findByname(product.getName());
//		ProductImage productImage= new ProductImage();
		//efgregrrgrtrtr
		
		productImage.setProductID(getproduct.getProductID());
		productImage.setPath(product.getPath());
		return productImageRepository.save(productImage);
	}
	// delete product
	@DeleteMapping("/product/{id}")
	public Map<String, Boolean> delete(@PathVariable(value = "id") int productid) throws 
	Exception {
	
	Product product = productRepository.findById(productid) .orElseThrow(() -> new ResourceNotFoundException("Product not found on: " + productid));
	productRepository.delete(product);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
	} 
	
}

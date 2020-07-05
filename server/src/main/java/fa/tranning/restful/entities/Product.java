package fa.tranning.restful.entities;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class Product {

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private int productID;

	 @Column(name="name")
	 private String name;
	 
	 @Column(name="created_date")
	 private String created_date;
	 
	 @Column(name="price")
	 private Float price;
	 
	 @Column(name="description")
	 private String description;
	 
	 @Column(name="product_group_id")
	 private int product_group_id;
	 
	 @Column(name="userID")
	 private int userID;
	 
	 @Column(name="quantity")
	 private int quantity;

	 private  String groupname;
	 private  String variant;
	 private String path;
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	 public String getVariant() {
		return variant;
	}

	public void setVariant(String variant) {
		this.variant = variant;
	}

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@OneToMany(targetEntity = ProductImage.class,cascade = CascadeType.ALL)
	 @JoinColumn(name="productID",referencedColumnName = "productID")
	 private List<ProductImage> productImages;
	 
	public List<ProductImage> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<ProductImage> productImages) {
		this.productImages = productImages;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreated_date() {
		return created_date;
	}

	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getProduct_group_id() {
		return product_group_id;
	}

	public void setProduct_group_id(int product_group_id) {
		this.product_group_id = product_group_id;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}
	 
}

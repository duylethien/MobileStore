package fa.tranning.restful.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="productimage")
public class ProductImage {

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private int imageID;

	 @Column(name="productID")
	 private int productID;
	 
	 @Column(name="path")
	 private String path;

	public int getImageID() {
		return imageID;
	}

	public void setImageID(int imageID) {
		this.imageID = imageID;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	 
}


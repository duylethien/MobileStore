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
@Table(name="productgroup")
public class ProductGroup {
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private int id;

	 @Column(name="groupname")
	 private String name;
	 
	 @Column(name="price")
	 private Float price;

	 
	@OneToMany(targetEntity = Product.class,cascade = CascadeType.ALL)
	 @JoinColumn(name="product_group_id",referencedColumnName = "id")
	 private List<Product> product;
	 
	
	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}
	 
	 
	
}

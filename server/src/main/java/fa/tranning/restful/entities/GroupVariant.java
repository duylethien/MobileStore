package fa.tranning.restful.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="groupvariant")
public class GroupVariant {
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private int id;

	 @Column(name="variantname")
	 private String variantname;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getVariantname() {
		return variantname;
	}

	public void setVariantname(String variantname) {
		this.variantname = variantname;
	}
	 
}

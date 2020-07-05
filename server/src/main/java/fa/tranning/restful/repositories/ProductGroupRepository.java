package fa.tranning.restful.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.tranning.restful.entities.ProductGroup;

public interface ProductGroupRepository  extends JpaRepository<ProductGroup, Integer> {
	public ProductGroup findById(int id);
}


package fa.tranning.restful.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.tranning.restful.entities.Product;

public interface ProductRepository  extends JpaRepository<Product, Integer> {
	public Product findByname(String name);
}

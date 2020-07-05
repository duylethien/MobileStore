package fa.tranning.restful.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.tranning.restful.entities.ProductImage;


public interface ProductImageRepository  extends JpaRepository<ProductImage, Integer> {
}

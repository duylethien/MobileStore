package fa.tranning.restful.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.tranning.restful.entities.GroupVariant;

public interface ProductVariantRepository  extends JpaRepository<GroupVariant, Integer> {
	public GroupVariant findById(int id);
}


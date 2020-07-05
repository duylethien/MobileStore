package fa.tranning.restful.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.tranning.restful.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	public User findByNameAndPassword(String user, String password);
//	public User getAllUsers(String name, String password);
	public List<User> findAll();
	
}

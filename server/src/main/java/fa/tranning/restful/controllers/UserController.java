package fa.tranning.restful.controllers;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

import fa.tranning.restful.entities.User;
import fa.tranning.restful.exceptions.ResourceNotFoundException;
import fa.tranning.restful.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)

@RequestMapping("user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	
//	Get List
	@GetMapping("/list")
	 public List<User> getAllUsers() {
		 return userRepository.findAll();
	 }
	
// Sign in
	@PostMapping("/signin")
	public ResponseEntity<User> signIn(@Validated @RequestBody User u) {
		User user = userRepository.findByNameAndPassword(u.getName(),
				u.getPassword());
		if (user == null) {
			return ResponseEntity.ok(null);
		}
		return ResponseEntity.ok(user);
	}
//get user by id
	@GetMapping("/get/{id}")
	 public ResponseEntity<User> getUserById(@PathVariable(value = "id") int id) throws ResourceNotFoundException 
		{
			User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found on id: "+id));
	
			return ResponseEntity.ok().body(user);
		}
// add user
	@PostMapping("/add")
	 public User create(@Validated @RequestBody User user) {
	 return userRepository.save(user);
	 }
	
// update user password
	@PutMapping("/update/{id}")
	 public ResponseEntity<User> update(@PathVariable(value = "id") int userId,
	 @Validated @RequestBody User userDetails) throws ResourceNotFoundException 
	{
			User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found on: " + userId));
			user.setPassword(userDetails.getPassword());
			final User updatedUser = userRepository.save(user);
	
			return ResponseEntity.ok(updatedUser);
	 }
// delete user by id
	@DeleteMapping("/delete/{id}")
	public Map<String, Boolean> delete(@PathVariable(value = "id") int userId) throws 
	Exception {
	
	User user = userRepository.findById(userId) .orElseThrow(() -> new ResourceNotFoundException("User not found on: " + userId));
	userRepository.delete(user);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
	}
}
using Deshawns.Models;
using Deshawns.Models.DTOs;

List<Dog> dogs = new List<Dog> {
    new Dog { Id = 1, Name = "Deedubya", WalkerId = 2, CityId = 1 },
    new Dog { Id = 2, Name = "Bark Twain", WalkerId = 1, CityId = 2 },
    new Dog { Id = 3, Name = "Sir Waggington", WalkerId = 3, CityId = 3 },
    new Dog { Id = 4, Name = "Pupperoni", WalkerId = 1, CityId = 1 },
    new Dog { Id = 5, Name = "Fluff McSnuffles", WalkerId = 2, CityId = 2 },
    new Dog { Id = 6, Name = "Clifford", WalkerId = null, CityId = 3 }
};


List<Walker> walkers = new List<Walker> {
    new Walker { Id = 1, WalkerName = "Simon" },
    new Walker { Id = 2, WalkerName = "Ronald" },
    new Walker { Id = 3, WalkerName = "Lyle" }
};

List<City> cities = new List<City> {
    new City { Id = 1, CityName = "Chicago" },
    new City { Id = 2, CityName = "Nashville" },
    new City { Id = 3, CityName = "NYC" }
};

List<CityWalker> cityWalkers = new List<CityWalker> {
    new CityWalker { Id = 1, CityId = 1, WalkerId = 1 },
    new CityWalker { Id = 2, CityId = 1, WalkerId = 2 },
    new CityWalker { Id = 3, CityId = 2, WalkerId = 3 },
    new CityWalker { Id = 4, CityId = 3, WalkerId = 1 },
    new CityWalker { Id = 5, CityId = 2, WalkerId = 2 }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

// Dogs
app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});


app.MapGet("/api/dogs/{id}", (int id) =>
{
    var dog = dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null) return Results.NotFound();

    var walkerName = dog.WalkerId.HasValue
        ? walkers.FirstOrDefault(w => w.Id == dog.WalkerId)?.WalkerName
        : null;

    var DTO = new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        WalkerName = walkerName,
        CityId = dog.CityId
    };

    return Results.Ok(DTO);
});


app.MapPost("/api/dogs", (Dog newDog) =>
{
    int newId = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;

    newDog.Id = newId;

    dogs.Add(newDog);

    return Results.Created($"/api/dogs/{newDog.Id}", new DogDTO
    {
        Id = newDog.Id,
        Name = newDog.Name,
        WalkerId = newDog.WalkerId,
        CityId = newDog.CityId
    });
});


app.MapGet("/api/dog-assign", (int walkerId) =>
{
    //make a list of join tables the walker is in
    var cityWalkerEntries = cityWalkers.Where(cw => cw.WalkerId == walkerId).ToList();

    //gets us all the city ids for the walker we currently have clicked
    var cityIds = cityWalkerEntries.Select(cw => cw.CityId).ToList();

    //go through the city id ints and find the dogs w/ that city id
    var dogsInCity = dogs.Where(d => cityIds.Contains(d.CityId) && d.WalkerId == null)
                               .Select(d => new DogDTO
                               {
                                   Id = d.Id,
                                   Name = d.Name,
                                   WalkerId = d.WalkerId,
                                   CityId = d.CityId
                               })
                               .ToList();

    return Results.Ok(dogsInCity);
});

app.MapDelete("/api/dogs/{id}", (int id) => $"Delete dog with id {id}");

// Walkers
app.MapGet("/api/walkers", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        WalkerName = w.WalkerName
    });
});

app.MapGet("/api/walkers/{id}", (int id) => $"Fetch walker with id {id}");
app.MapPut("/api/walkers/{id}/cities", (int id) => $"Update cities for walker {id}");
app.MapDelete("/api/walkers/{id}", (int id) => $"Delete walker with id {id}");

// Cities
app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        CityName = c.CityName
    });
});

app.MapPost("/api/cities", (City newCity) =>
{
    int newId = cities.Count > 0 ? cities.Max(c => c.Id) + 1 : 1;

    newCity.Id = newId;

    cities.Add(newCity);

    return Results.Created($"/api/cities/{newCity.Id}", new CityDTO
    {
        Id = newCity.Id,
        CityName = newCity.CityName
    });
});

// Assign Dog to Walker
app.MapPost("/api/walkers/{walkerId}/assign-dog/{dogId}", (int walkerId, int dogId) =>
{
    var dog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (dog == null) return Results.NotFound();

    dog.WalkerId = walkerId;

    // Optional: include WalkerName in the response
    var walkerName = walkers.FirstOrDefault(w => w.Id == walkerId)?.WalkerName;

    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        WalkerName = walkerName,
        CityId = dog.CityId
    });
});


// Filter Walkers by City
app.MapGet("/api/walkers-by-city", (int cityId) =>
{
    // Get all the cityWalker entries related to the given cityId
    var cityWalkerEntries = cityWalkers.Where(cw => cw.CityId == cityId).ToList();

    // Extract the WalkerId from the CityWalker entries
    var walkerIds = cityWalkerEntries.Select(cw => cw.WalkerId).ToList();

    // Fetch walkers using the WalkerId
    var walkersInCity = walkers.Where(w => walkerIds.Contains(w.Id))
                               .Select(w => new WalkerDTO
                               {
                                   Id = w.Id,
                                   WalkerName = w.WalkerName
                               })
                               .ToList();

    // Return the list of walkers in the selected city
    return Results.Ok(walkersInCity);
});


app.Run();
